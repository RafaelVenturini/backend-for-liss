export function reduceLink(link: string) {
    return link
        .replace("https://s3.amazonaws.com/tiny-anexos-us/erp/ODQwNDQxNDUw/", '')
        .replace('.webp', '')
}