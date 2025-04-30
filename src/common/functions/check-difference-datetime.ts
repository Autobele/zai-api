const diffBetweenDateTime = (data1: Date, data2: Date, minutes: number): boolean => {
    const MILI_TO_SECONDS = minutes * 60 * 1000;

    const diff = Math.abs(data1.getTime() - data2.getTime());

    return diff >= MILI_TO_SECONDS;
}

export default diffBetweenDateTime