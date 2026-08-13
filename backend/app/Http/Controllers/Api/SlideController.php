<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SlideController extends Controller
{
    /**
     * Public: active slides for the hero carousel.
     */
    public function index()
    {
        return Slide::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    /**
     * Admin: all slides.
     */
    public function adminIndex()
    {
        return Slide::query()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    /**
     * Admin: create a slide. Expects a multipart request with an `image` file.
     */
    public function store(Request $request)
    {
        $data = $this->validateData($request, imageRequired: true);
        $data['image_path'] = $this->storeImage($request);

        $slide = Slide::create($data);

        return response()->json($slide, 201);
    }

    /**
     * Admin: update a slide. `image` is optional; the existing image is kept
     * when no new file is uploaded. Sent as POST (multipart) for PHP support.
     */
    public function update(Request $request, Slide $slide)
    {
        $data = $this->validateData($request, imageRequired: false);

        if ($request->hasFile('image')) {
            $this->deleteImage($slide->image_path);
            $data['image_path'] = $this->storeImage($request);
        }

        $slide->update($data);

        return response()->json($slide);
    }

    public function destroy(Slide $slide)
    {
        $this->deleteImage($slide->image_path);
        $slide->delete();

        return response()->json(['message' => 'Slide deleted.']);
    }

    private function validateData(Request $request, bool $imageRequired): array
    {
        $validated = $request->validate([
            'image' => [$imageRequired ? 'required' : 'nullable', 'image', 'max:5120'],
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:500'],
            'button_text' => ['nullable', 'string', 'max:100'],
            'button_link' => ['nullable', 'string', 'max:2048'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        // The image is handled separately; strip it from the model payload.
        unset($validated['image']);

        return $validated;
    }

    /**
     * Move the uploaded file into public/uploads/slides and return its
     * web-relative path (e.g. "uploads/slides/abc123.jpg").
     */
    private function storeImage(Request $request): string
    {
        $file = $request->file('image');
        $dir = public_path('uploads/slides');
        File::ensureDirectoryExists($dir);

        $name = Str::uuid().'.'.$file->getClientOriginalExtension();
        $file->move($dir, $name);

        return 'uploads/slides/'.$name;
    }

    private function deleteImage(?string $path): void
    {
        // Only remove locally-stored uploads, never external URLs.
        if ($path && ! Str::startsWith($path, ['http://', 'https://'])) {
            File::delete(public_path($path));
        }
    }
}
