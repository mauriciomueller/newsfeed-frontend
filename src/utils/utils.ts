export const processImageUrl = (url: string | undefined) => {
    if (!url ||
        !url.length ||
        url.includes('(') ||
        url.includes(')')
    ) {
        return "/assets/images/no-image.png"
    }

    return url
}