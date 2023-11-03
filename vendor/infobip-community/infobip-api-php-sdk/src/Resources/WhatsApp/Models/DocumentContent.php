<?php

declare(strict_types=1);

namespace Infobip\Resources\WhatsApp\Models;

use Infobip\Resources\WhatsApp\Contracts\ContentInterface;
use Infobip\Validations\Rules;
use Infobip\Validations\Rules\BetweenLengthRule;
use Infobip\Validations\Rules\UrlRule;

final class DocumentContent implements ContentInterface
{
    /** @var string */
    private $mediaUrl;

    /** @var string|null */
    private $caption = null;

    /** @var string|null */
    private $filename = null;

    public function __construct(string $mediaUrl)
    {
        $this->mediaUrl = $mediaUrl;
    }

    public function setCaption(?string $caption): self
    {
        $this->caption = $caption;
        return $this;
    }

    public function setFilename(?string $filename): self
    {
        $this->filename = $filename;
        return $this;
    }

    public function toArray(): array
    {
        return array_filter_recursive([
            'mediaUrl' => $this->mediaUrl,
            'caption' => $this->caption,
            'filename' => $this->filename,
        ]);
    }

    public function rules(): Rules
    {
        return (new Rules())
            ->addRule(new BetweenLengthRule('content.mediaUrl', $this->mediaUrl, 1, 2048))
            ->addRule(new UrlRule('content.mediaUrl', $this->mediaUrl))
            ->addRule(new BetweenLengthRule('content.caption', $this->caption, 0, 3000))
            ->addRule(new BetweenLengthRule('content.filename', $this->filename, 0, 240));
    }
}
