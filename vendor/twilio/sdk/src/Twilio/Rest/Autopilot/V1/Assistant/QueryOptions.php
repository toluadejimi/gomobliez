<?php
/**
 * This code was generated by
 * ___ _ _ _ _ _    _ ____    ____ ____ _    ____ ____ _  _ ____ ____ ____ ___ __   __
 *  |  | | | | |    | |  | __ |  | |__| | __ | __ |___ |\ | |___ |__/ |__|  | |  | |__/
 *  |  |_|_| | |___ | |__|    |__| |  | |    |__] |___ | \| |___ |  \ |  |  | |__| |  \
 *
 * Twilio - Autopilot
 * This is the public Twilio REST API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator.
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

namespace Twilio\Rest\Autopilot\V1\Assistant;

use Twilio\Options;
use Twilio\Values;

abstract class QueryOptions
{
    /**
     * @param string $tasks The list of tasks to limit the new query to. Tasks are expressed as a comma-separated list of task `unique_name` values. For example, `task-unique_name-1, task-unique_name-2`. Listing specific tasks is useful to constrain the paths that a user can take.
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     * @return CreateQueryOptions Options builder
     */
    public static function create(
        
        string $tasks = Values::NONE,
        string $modelBuild = Values::NONE

    ): CreateQueryOptions
    {
        return new CreateQueryOptions(
            $tasks,
            $modelBuild
        );
    }



    /**
     * @param string $language The [ISO language-country](https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html) string that specifies the language used by the Query resources to read. For example: `en-US`.
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     * @param string $status The status of the resources to read. Can be: `pending-review`, `reviewed`, or `discarded`
     * @param string $dialogueSid The SID of the [Dialogue](https://www.twilio.com/docs/autopilot/api/dialogue).
     * @return ReadQueryOptions Options builder
     */
    public static function read(
        
        string $language = Values::NONE,
        string $modelBuild = Values::NONE,
        string $status = Values::NONE,
        string $dialogueSid = Values::NONE

    ): ReadQueryOptions
    {
        return new ReadQueryOptions(
            $language,
            $modelBuild,
            $status,
            $dialogueSid
        );
    }

    /**
     * @param string $sampleSid The SID of an optional reference to the [Sample](https://www.twilio.com/docs/autopilot/api/task-sample) created from the query.
     * @param string $status The new status of the resource. Can be: `pending-review`, `reviewed`, or `discarded`
     * @return UpdateQueryOptions Options builder
     */
    public static function update(
        
        string $sampleSid = Values::NONE,
        string $status = Values::NONE

    ): UpdateQueryOptions
    {
        return new UpdateQueryOptions(
            $sampleSid,
            $status
        );
    }

}

class CreateQueryOptions extends Options
    {
    /**
     * @param string $tasks The list of tasks to limit the new query to. Tasks are expressed as a comma-separated list of task `unique_name` values. For example, `task-unique_name-1, task-unique_name-2`. Listing specific tasks is useful to constrain the paths that a user can take.
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     */
    public function __construct(
        
        string $tasks = Values::NONE,
        string $modelBuild = Values::NONE

    ) {
        $this->options['tasks'] = $tasks;
        $this->options['modelBuild'] = $modelBuild;
    }

    /**
     * The list of tasks to limit the new query to. Tasks are expressed as a comma-separated list of task `unique_name` values. For example, `task-unique_name-1, task-unique_name-2`. Listing specific tasks is useful to constrain the paths that a user can take.
     *
     * @param string $tasks The list of tasks to limit the new query to. Tasks are expressed as a comma-separated list of task `unique_name` values. For example, `task-unique_name-1, task-unique_name-2`. Listing specific tasks is useful to constrain the paths that a user can take.
     * @return $this Fluent Builder
     */
    public function setTasks(string $tasks): self
    {
        $this->options['tasks'] = $tasks;
        return $this;
    }

    /**
     * The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     *
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     * @return $this Fluent Builder
     */
    public function setModelBuild(string $modelBuild): self
    {
        $this->options['modelBuild'] = $modelBuild;
        return $this;
    }

    /**
     * Provide a friendly representation
     *
     * @return string Machine friendly representation
     */
    public function __toString(): string
    {
        $options = \http_build_query(Values::of($this->options), '', ' ');
        return '[Twilio.Autopilot.V1.CreateQueryOptions ' . $options . ']';
    }
}



class ReadQueryOptions extends Options
    {
    /**
     * @param string $language The [ISO language-country](https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html) string that specifies the language used by the Query resources to read. For example: `en-US`.
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     * @param string $status The status of the resources to read. Can be: `pending-review`, `reviewed`, or `discarded`
     * @param string $dialogueSid The SID of the [Dialogue](https://www.twilio.com/docs/autopilot/api/dialogue).
     */
    public function __construct(
        
        string $language = Values::NONE,
        string $modelBuild = Values::NONE,
        string $status = Values::NONE,
        string $dialogueSid = Values::NONE

    ) {
        $this->options['language'] = $language;
        $this->options['modelBuild'] = $modelBuild;
        $this->options['status'] = $status;
        $this->options['dialogueSid'] = $dialogueSid;
    }

    /**
     * The [ISO language-country](https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html) string that specifies the language used by the Query resources to read. For example: `en-US`.
     *
     * @param string $language The [ISO language-country](https://docs.oracle.com/cd/E13214_01/wli/docs92/xref/xqisocodes.html) string that specifies the language used by the Query resources to read. For example: `en-US`.
     * @return $this Fluent Builder
     */
    public function setLanguage(string $language): self
    {
        $this->options['language'] = $language;
        return $this;
    }

    /**
     * The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     *
     * @param string $modelBuild The SID or unique name of the [Model Build](https://www.twilio.com/docs/autopilot/api/model-build) to be queried.
     * @return $this Fluent Builder
     */
    public function setModelBuild(string $modelBuild): self
    {
        $this->options['modelBuild'] = $modelBuild;
        return $this;
    }

    /**
     * The status of the resources to read. Can be: `pending-review`, `reviewed`, or `discarded`
     *
     * @param string $status The status of the resources to read. Can be: `pending-review`, `reviewed`, or `discarded`
     * @return $this Fluent Builder
     */
    public function setStatus(string $status): self
    {
        $this->options['status'] = $status;
        return $this;
    }

    /**
     * The SID of the [Dialogue](https://www.twilio.com/docs/autopilot/api/dialogue).
     *
     * @param string $dialogueSid The SID of the [Dialogue](https://www.twilio.com/docs/autopilot/api/dialogue).
     * @return $this Fluent Builder
     */
    public function setDialogueSid(string $dialogueSid): self
    {
        $this->options['dialogueSid'] = $dialogueSid;
        return $this;
    }

    /**
     * Provide a friendly representation
     *
     * @return string Machine friendly representation
     */
    public function __toString(): string
    {
        $options = \http_build_query(Values::of($this->options), '', ' ');
        return '[Twilio.Autopilot.V1.ReadQueryOptions ' . $options . ']';
    }
}

class UpdateQueryOptions extends Options
    {
    /**
     * @param string $sampleSid The SID of an optional reference to the [Sample](https://www.twilio.com/docs/autopilot/api/task-sample) created from the query.
     * @param string $status The new status of the resource. Can be: `pending-review`, `reviewed`, or `discarded`
     */
    public function __construct(
        
        string $sampleSid = Values::NONE,
        string $status = Values::NONE

    ) {
        $this->options['sampleSid'] = $sampleSid;
        $this->options['status'] = $status;
    }

    /**
     * The SID of an optional reference to the [Sample](https://www.twilio.com/docs/autopilot/api/task-sample) created from the query.
     *
     * @param string $sampleSid The SID of an optional reference to the [Sample](https://www.twilio.com/docs/autopilot/api/task-sample) created from the query.
     * @return $this Fluent Builder
     */
    public function setSampleSid(string $sampleSid): self
    {
        $this->options['sampleSid'] = $sampleSid;
        return $this;
    }

    /**
     * The new status of the resource. Can be: `pending-review`, `reviewed`, or `discarded`
     *
     * @param string $status The new status of the resource. Can be: `pending-review`, `reviewed`, or `discarded`
     * @return $this Fluent Builder
     */
    public function setStatus(string $status): self
    {
        $this->options['status'] = $status;
        return $this;
    }

    /**
     * Provide a friendly representation
     *
     * @return string Machine friendly representation
     */
    public function __toString(): string
    {
        $options = \http_build_query(Values::of($this->options), '', ' ');
        return '[Twilio.Autopilot.V1.UpdateQueryOptions ' . $options . ']';
    }
}

