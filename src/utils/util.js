export default {
    _promise: (fun = () => 0, time_out) => new Promise((resolve, reject) => {
        try {
            time_out ? setTimeout(() => resolve(fun()), time_out) : resolve(fun());
        } catch (error) {
            time_out ? setTimeout(() => reject(error), time_out) : reject(error);
        }
    }),
}
