export const changeServiceFormat = (input: string) => {
    const output = input.replace(/(\b\w+\b)/g, (match) => {
        return match.charAt(0).toUpperCase() + match.slice(1);
    }).replace(/-/g, ' ');
    
    return output;
};
