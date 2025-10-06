<?php

namespace App\Http\Controllers;

use App\Models\ToggleJob;
use Illuminate\Http\Request;

class ToggleJobController extends Controller
{
    public function update(Request $request, ToggleJob $toggleJob)
    {
        $toggleJob->update([
            "open" => !$request->input("data")
        ]);

        return back()->with("success", "Action Successifully");
    }
}