<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\CompanyInfo;
use App\Models\PopUp;
use App\Models\SocialNetwork;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the homepage with visitor tracking.
     */
    public function index(Request $request): Response
    {
        // Track visitor by IP
        $visitorIP = $request->ip();
        $visitor = Visitor::firstOrCreate(['ip' => $visitorIP]);
        $visitor->increment('request');
        $visitor->save();

        // Get common data
        $data = [
            'abouts' => About::all(),
            'socialnetwork' => SocialNetwork::all(),
            'infos' => CompanyInfo::all(),
            'popups' => PopUp::all(),
        ];

        return Inertia::render('public/home', $data);
    }
}