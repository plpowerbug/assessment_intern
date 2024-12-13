function generateShortCode(storeId, transactionId) {
    // Logic goes here
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const daysSinceStartOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    if (storeId > 999 || transactionId > 9999) {
        throw new Error("storeId must be <= 999 and transactionId must be <= 9999");
    }
    // Decode parts from base-36
    const storeCode = storeId.toString(36).padStart(2, '0'); // 2 characters
    const dateCode = daysSinceStartOfYear.toString(36).padStart(2, '0'); 
    const transactionCode = transactionId.toString(36).padStart(4, '0'); // 4 characters
    // Add a checksum for integrity
    const checksum = ((storeId + daysSinceStartOfYear + transactionId) % 36).toString(36);
    code = storeCode.toString()+dateCode.toString()+transactionCode.toString()+checksum.toString()
    return code;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here
    // Extract parts
    const storeCode = shortCode.slice(0, 2);
    const dateCode = shortCode.slice(2, 4);
    const transactionCode = shortCode.slice(4, 8);
    const checksum = shortCode.slice(8);
    // Decode parts from base-36
    const storeId = parseInt(storeCode, 36);
    const daysSinceStartOfYear = parseInt(dateCode, 36);
    const transactionId = parseInt(transactionCode, 36);
    const expectedChecksum = ((storeId + daysSinceStartOfYear + transactionId) % 36).toString(36);
    if (expectedChecksum !== checksum) {
        throw new Error("Invalid checksum or tampered code");
    }

// Reconstruct date from days since start of year
    const year = new Date().getFullYear();
    const shopDate = new Date(year, 0, daysSinceStartOfYear);  
    return {
    storeId: storeId, // store id goes here,
    shopDate: shopDate, // the date the customer shopped,
    transactionId: transactionId, // transaction id goes here
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}
