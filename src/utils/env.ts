export const isDev = ()  => {
    return process.env.NODE_ENV === 'development'
}

export const shouldTrackUserActivity = () => {
    if (!isDev())
        return true;
    return import.meta.env.WXT_SHOULD_TRACK_USER_ACTIVITY === '1'
}