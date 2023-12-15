<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProxyController extends Controller
{
    public function proxy(Request $request)
    {
        $apiUrl = 'https://web.enkpay.com/api/resolve-bank';
        $queryParams = $request->query();
        $client = new Client();

        try {
            // Make a request to the external API
            $response = $client->get($apiUrl, [
                'query' => $queryParams,
            ]);

            // Return the API response
            return response($response->getBody(), $response->getStatusCode())
                ->header('Content-Type', 'application/json');
        } catch (\Exception $e) {
            // Handle errors
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
