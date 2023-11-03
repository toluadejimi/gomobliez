<?php

declare(strict_types=1);

namespace Tests\Endpoints\WhatsApp;

use Infobip\Enums\StatusCode;
use Infobip\Exceptions\InfobipForbiddenException;
use Infobip\Exceptions\InfobipNotFoundException;
use Infobip\Resources\WhatsApp\WhatsAppGetMediaMetaDataResource;
use Tests\Endpoints\TestCase;

final class GetWhatsAppMediaMetaDataTest extends TestCase
{
    public function testApiCallExpectsSuccess(): void
    {
        // arrange
        $resource = $this->getResource();
        $mockedResponse = $this->loadJsonDataFixture('Endpoints/WhatsApp/get_whatsapp_media_metadata_success.json');

        $this->setMockedGuzzleHttpClient(
            StatusCode::SUCCESS,
            $mockedResponse
        );

        // act
        $response = $this
            ->getInfobipClient()
            ->whatsApp()
            ->getWhatsAppMediaMetaData($resource);

        // assert
        $this->assertSame($mockedResponse, $response);
    }

    public function testApiCallExpectsForbiddenException(): void
    {
        // arrange
        $resource = $this->getResource();
        $mockedResponse = $this->loadJsonDataFixture('Endpoints/WhatsApp/get_whatsapp_media_metadata_sender_not_found.json');

        $this->setMockedGuzzleHttpClient(
            StatusCode::FORBIDDEN,
            $mockedResponse
        );

        // act & assert
        $this->expectException(InfobipForbiddenException::class);
        $this->expectExceptionCode(StatusCode::FORBIDDEN);

        $this
            ->getInfobipClient()
            ->whatsApp()
            ->getWhatsAppMediaMetaData($resource);
    }

    public function testApiCallExpectsNotFoundException(): void
    {
        // arrange
        $resource = $this->getResource();
        $mockedResponse = $this->loadJsonDataFixture('Endpoints/WhatsApp/get_whatsapp_media_metadata_media_not_found.json');

        $this->setMockedGuzzleHttpClient(
            StatusCode::NOT_FOUND,
            $mockedResponse
        );

        // act & assert
        $this->expectException(InfobipNotFoundException::class);
        $this->expectExceptionCode(StatusCode::NOT_FOUND);

        $this
            ->getInfobipClient()
            ->whatsApp()
            ->getWhatsAppMediaMetaData($resource);
    }

    private function getResource(): WhatsAppGetMediaMetaDataResource
    {
        return new WhatsAppGetMediaMetaDataResource(
            'mediaId',
            'sender'
        );
    }
}
