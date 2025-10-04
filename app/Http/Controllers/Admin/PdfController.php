<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ServiceRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class PdfController extends Controller
{
    /**
     * Generate PDF for client.
     */
    public function client(Client $client): Response
    {
        $client->load('category');

        $pdf = Pdf::loadView('admin.pdf.client', [
            'record' => $client,
        ]);

        return $pdf->download($client->name . '.pdf');
    }

    /**
     * Generate PDF for service request.
     */
    public function serviceRequest(ServiceRequest $serviceRequest): Response
    {
        $serviceRequest->load('techAssign');

        $pdf = Pdf::loadView('admin.pdf.service-request', [
            'record' => $serviceRequest,
        ]);

        return $pdf->download($serviceRequest->name . '.pdf');
    }
}
