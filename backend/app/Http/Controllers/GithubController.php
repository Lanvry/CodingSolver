<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GithubController extends Controller
{
    private function fetchFromGithub($url)
    {
        // Cache for 1 hour to avoid rate limits
        return Cache::remember('github_' . md5($url), 3600, function () use ($url) {
            $options = [
                'http' => [
                    'method' => 'GET',
                    'header' => [
                        "Accept: application/vnd.github.v3+json",
                        "User-Agent: Lumen-Proxy"
                    ],
                    'ignore_errors' => true
                ]
            ];
            
            if (env('GITHUB_TOKEN')) {
                $options['http']['header'][] = 'Authorization: token ' . env('GITHUB_TOKEN');
            }

            $context = stream_context_create($options);
            $response = @file_get_contents($url, false, $context);
            
            $status = 200;
            if (isset($http_response_header[0])) {
                if (preg_match('#HTTP/\d+\.\d+ (\d+)#', $http_response_header[0], $matches)) {
                    $status = (int)$matches[1];
                }
            }

            return [
                'status' => $status,
                'data' => json_decode($response, true)
            ];
        });
    }

    public function getRepos($username)
    {
        $url = "https://api.github.com/users/{$username}/repos?sort=updated&per_page=6";
        $result = $this->fetchFromGithub($url);

        return response()->json($result['data'], $result['status']);
    }

    public function getRepoDetails($username, $repo)
    {
        $url = "https://api.github.com/repos/{$username}/{$repo}";
        $result = $this->fetchFromGithub($url);

        return response()->json($result['data'], $result['status']);
    }

    public function getRepoContents($username, $repo, $path = null)
    {
        $pathQuery = $path ? "/{$path}" : '';
        $url = "https://api.github.com/repos/{$username}/{$repo}/contents{$pathQuery}";
        $result = $this->fetchFromGithub($url);

        return response()->json($result['data'], $result['status']);
    }
}
