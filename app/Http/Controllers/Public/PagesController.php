<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\CompanyInfo;
use App\Models\Gallery;
use App\Models\PopUp;
use App\Models\SocialNetwork;
use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
    /**
     * Get common data for public pages.
     */
    private function getCommonData(bool $includePopups = true): array
    {
        $data = [
            'abouts' => About::all(),
            'socialnetwork' => SocialNetwork::all(),
            'infos' => CompanyInfo::all(),
        ];

        if ($includePopups) {
            $data['popups'] = PopUp::all();
        }

        return $data;
    }

    /**
     * Display the services page.
     */
    public function service(): Response
    {
        return Inertia::render('public/service', $this->getCommonData());
    }

    /**
     * Display the gallery page with images.
     */
    public function gallery(): Response
    {
        $data = $this->getCommonData();
        $data['images'] = Gallery::all();

        return Inertia::render('public/gallery', $data);
    }

    /**
     * Display the about page.
     */
    public function about(): Response
    {
        return Inertia::render('public/about', $this->getCommonData());
    }

    /**
     * Display the service categories page.
     */
    public function categories(): Response
    {
        return Inertia::render('public/categories', $this->getCommonData());
    }

    /**
     * Display the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('public/contact', $this->getCommonData());
    }

    /**
     * Display the service request form.
     */
    public function askservice(): Response
    {
        return Inertia::render('public/servicerequest', $this->getCommonData());
    }
}
