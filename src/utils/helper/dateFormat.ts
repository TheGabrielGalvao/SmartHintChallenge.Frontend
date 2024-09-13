export const dateFormat = (date: string): string => {
    const normalizedDate = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("pt-Br", options);
    const formattedDateTime = formatter.format(normalizedDate).replace(",", " -");

    return formattedDateTime;
};