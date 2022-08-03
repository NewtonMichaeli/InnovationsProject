// string validator util


/**
 * Method validates a given string by a given options set
 * @param value     the checked value
 * @param options   validation options
 * @returns `true` if the value passed the given options, `false` otherwise
 */
export const isValidString = (value: string, {
    length = 0,
    noSpaces = false,
    compare
}: {
    length?: number,
    noSpaces?: boolean,
    compare?: string
}) => {
    return !(
        // true statement will be invalid
        (noSpaces && !value.trim().length) ||
        (compare && value !== compare) ||
        value.length < length
    )
}