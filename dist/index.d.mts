interface PageViewEvent {
    type: 'pageview';
    url: string;
}
interface CustomEvent {
    type: 'event';
    url: string;
}
type BeforeSendEvent = PageViewEvent | CustomEvent;
type Mode = 'auto' | 'development' | 'production';
type AllowedPropertyValues = string | number | boolean | null;
type BeforeSend = (event: BeforeSendEvent) => BeforeSendEvent | null;
interface AnalyticsProps {
    beforeSend?: BeforeSend;
    debug?: boolean;
    mode?: Mode;
    scriptSrc?: string;
    endpoint?: string;
    dsn?: string;
}
declare global {
    interface Window {
        va?: (event: 'beforeSend' | 'event' | 'pageview', properties?: unknown) => void;
        vaq?: [string, unknown?][];
        vai?: boolean;
        vam?: Mode;
        /** used by Astro component only */
        webAnalyticsBeforeSend?: BeforeSend;
    }
}
type PlainFlags = Record<string, unknown>;
type FlagsDataInput = (string | PlainFlags)[] | PlainFlags;

declare function computeRoute(pathname: string | null, pathParams: Record<string, string | string[]> | null): string | null;

/**
 * Injects the Vercel Web Analytics script into the page head and starts tracking page views. Read more in our [documentation](https://vercel.com/docs/concepts/analytics/package).
 * @param [props] - Analytics options.
 * @param [props.mode] - The mode to use for the analytics script. Defaults to `auto`.
 *  - `auto` - Automatically detect the environment.  Uses `production` if the environment cannot be determined.
 *  - `production` - Always use the production script. (Sends events to the server)
 *  - `development` - Always use the development script. (Logs events to the console)
 * @param [props.debug] - Whether to enable debug logging in development. Defaults to `true`.
 * @param [props.beforeSend] - A middleware function to modify events before they are sent. Should return the event object or `null` to cancel the event.
 * @param [props.dsn] - The DSN of the project to send events to. Only required when self-hosting.
 * @param [props.disableAutoTrack] - Whether the injected script should track page views from pushState events. Disable if route is updated after pushState, a manually call page pageview().
 */
declare function inject(props?: AnalyticsProps & {
    framework?: string;
    disableAutoTrack?: boolean;
    basePath?: string;
}): void;
/**
 * Tracks a custom event. Please refer to the [documentation](https://vercel.com/docs/concepts/analytics/custom-events) for more information on custom events.
 * @param name - The name of the event.
 * * Examples: `Purchase`, `Click Button`, or `Play Video`.
 * @param [properties] - Additional properties of the event. Nested objects are not supported. Allowed values are `string`, `number`, `boolean`, and `null`.
 */
declare function track(name: string, properties?: Record<string, AllowedPropertyValues>, options?: {
    flags?: FlagsDataInput;
}): void;
declare function pageview({ route, path, }: {
    route?: string | null;
    path?: string;
}): void;

declare const _default: {
    inject: typeof inject;
    track: typeof track;
    computeRoute: typeof computeRoute;
};

export { type AnalyticsProps, type BeforeSend, type BeforeSendEvent, computeRoute, _default as default, inject, pageview, track };
