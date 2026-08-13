<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Public: store a contact form submission.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $submission = ContactSubmission::create($data);

        return response()->json([
            'message' => 'Thank you! Your message has been received.',
            'data' => $submission,
        ], 201);
    }

    /**
     * Admin: list submissions, newest first.
     */
    public function index()
    {
        return ContactSubmission::query()
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Admin: mark a submission as read.
     */
    public function markRead(ContactSubmission $contact)
    {
        $contact->update(['is_read' => true]);

        return response()->json($contact);
    }

    public function destroy(ContactSubmission $contact)
    {
        $contact->delete();

        return response()->json(['message' => 'Submission deleted.']);
    }
}
