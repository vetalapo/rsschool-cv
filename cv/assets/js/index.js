"use strinct";

getMonthName = (date) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return month[date.getMonth()];
};

getYear = (date) => {
    return date.getFullYear();
};

getFormattedMonthAndYearForDate = (date) => {
    return `${getMonthName(date)}, ${getYear(date)}`;
};

getFormattedAttributeForDate = (date) => {
    return `${getYear(date)}-${date.getMonth() + 1}-${date.getDate()}`;
};

updateCopyrightInfo = (date) => {
    const copyrightElement = document.getElementById("copyright-date");
    
    copyrightElement.innerText = getFormattedMonthAndYearForDate(date);
    copyrightElement.setAttribute("datetime", getFormattedAttributeForDate(date));
};

// On load
(() => {
    updateCopyrightInfo(new Date());
})();
