import fs from "fs";

export const logErrorToFile = (error) => {
  const currentDateTime = new Date();
  const formattedTimestamp = currentDateTime
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      millisecond: "2-digit",
    })
    .replace(/[\s:/]/g, "");
  const logFileName = `error-log-${formattedTimestamp}.txt`;

  const errorMessage = `Date: ${currentDateTime}\nError Message: ${error.message}\n`;
  const stackTrace = error.stack;

  const filePath = `logs/${logFileName}`;

  fs.appendFile(filePath, errorMessage + stackTrace, (err) => {
    if (err) {
      console.error("Error writing to error log:", err);
    }
  });
};
