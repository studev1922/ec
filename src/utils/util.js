export default {
    _promise: (fun = () => 0, time_out) => new Promise((resolve, reject) => {
        try {
            time_out ? setTimeout(() => resolve(fun()), time_out) : resolve(fun());
        } catch (error) {
            time_out ? setTimeout(() => reject(error), time_out) : reject(error);
        }
    }),
    generateSecret(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~[]\{}|;':\",./<>?";
        let secret = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            secret += characters.charAt(randomIndex);
        }
        return secret;
    },
}
