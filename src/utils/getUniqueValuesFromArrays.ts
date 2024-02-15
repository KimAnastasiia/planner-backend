/* eslint-disable prettier/prettier */
export const getUniqueObjects=(originalArray:{email:string}[])=> {
    const uniqueObjects:any=[];
    const uniqueStrings: Set<string> = new Set();

    originalArray.forEach(obj => {
        const uniqueObj: { [key: string]: string } = {};
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (!uniqueStrings.has(value)) {
                uniqueStrings.add(value);
                uniqueObj[key] = value;
            }
        });
        if (Object.keys(uniqueObj).length > 0) {
            uniqueObjects.push(uniqueObj);
        }
    });

    return uniqueObjects;
}