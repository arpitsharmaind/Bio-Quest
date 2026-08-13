<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Public: all settings as a { key: value } map.
     */
    public function index()
    {
        return Setting::pluck('value', 'key');
    }

    /**
     * Admin: bulk-update settings. Body: { "settings": { key: value, ... } }.
     * Unknown keys are created; existing keys are updated.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string'],
        ]);

        foreach ($validated['settings'] as $key => $value) {
            $group = str_starts_with($key, 'contact_') ? 'contact' : 'general';

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value, 'group' => $group],
            );
        }

        return response()->json(Setting::pluck('value', 'key'));
    }
}
