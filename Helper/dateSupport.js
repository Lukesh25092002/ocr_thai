function formatDate_universal_2_YYYYMMDD(str_date_universal){
    const input_date = new Date(str_date_universal);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
    const day = inputDate.getDate().toString().padStart(2, '0');

    const formatted_date = `${year}-${month}-${day}`;
    return formatted_date;
}

module.exports = {
    formatDate_universal_2_YYYYMMDD
};