export const urlConverter = (value) => {
    if (value != null) {
        const arr = value.split(" ")
        let url = ""
        for (let index = 0; index < arr.length; index++) {
            if (!(index == (arr.length - 1))) {
                url += arr[index] + '-'
            } else {
                url += arr[index]
            }


        }
        return url
    }
    return value
   
}

