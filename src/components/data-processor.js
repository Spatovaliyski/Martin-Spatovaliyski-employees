import React from 'react';

const DataProcessor = ({ csvData }) => {
  /**
   * Find the longest working pair of employees on the same project.
   *
   * @returns {Object} - { empID1, empID2, projectID, daysWorked }
   */
  const findLongestWorkingPair = () => {
    /** If there's not enough amount of data return */
    if (csvData.length < 2) {
      return null;
    }

    /**
     * Map of pairs to total days worked.
     */
    const pairs = new Map();

    /**
     * Compare each employee's projects with every other employee's projects.
     *
     * @param {Number} daysWorked - Number of days worked together.
     * @param {String} empID1 - Employee ID #1.
     * @param {String} empID2 - Employee ID #2.
     * @param {String} projectID1 - Project ID.
     * @param {String} projectID2 - Project ID.
     * @param {String} pairKey - Key for the pair of employees.
     * @param {Array} csvData - Array of employee project data.
     * @param {Date} dateFrom1Obj - Date the employee started the project.
     * @param {Date} dateTo1Obj - Date the employee ended the project.
     * @param {Date} dateFrom2Obj - Date the employee started the project.
     * @param {Date} dateTo2Obj - Date the employee ended the project.
     * 
     * @returns {Map<String, Number>} - Map of pairs to total days worked.
     *
     */
    for (let i = 0; i < csvData.length - 1; i++) {
      const { EmpID: empID1, ProjectID: projectID1, DateFrom: dateFrom1, DateTo: dateTo1 } = csvData[i];
      const dateFrom1Obj = new Date(dateFrom1);
      const dateTo1Obj = dateTo1 ? new Date(dateTo1) : new Date();

      /**
       * Compare each employee's projects with every other employee's projects.
       * 
       * @param {Array} csvData - Array of employee project data.
       * 
       * @returns {Map<String, Number>} - Map of pairs to total days worked.
       */
      for (let j = i + 1; j < csvData.length; j++) {
        const { EmpID: empID2, ProjectID: projectID2, DateFrom: dateFrom2, DateTo: dateTo2 } = csvData[j];
        const dateFrom2Obj = new Date(dateFrom2);
        const dateTo2Obj = dateTo2 ? new Date(dateTo2) : new Date();

        /** 
         * If the employees are different and the projects are the same, calculate the number of days worked together.
         */
        if (empID1 !== empID2 && projectID1 === projectID2) {
          const daysWorked = Math.floor((Math.min(dateTo1Obj, dateTo2Obj) - Math.max(dateFrom1Obj, dateFrom2Obj)) / (1000 * 60 * 60 * 24));
          const pairKey = [empID1, empID2, projectID1].join("-");
          pairs.set(pairKey, (pairs.get(pairKey) || 0) + daysWorked);
        }
      }
    }

    /**
     * Find the longest working pair.
     * 
     * @param {Array} pairs - Array of pairs.
     * 
     * @returns {Object} - { empID1, empID2, projectID, daysWorked }
     * 
     */
    const longestWorkingPair = Array.from(pairs.entries()).reduce(
      (longestPair, [pairKey, totalDays]) => {
        if (totalDays > longestPair.daysWorked) {
          const [empID1, empID2, projectID] = pairKey.split("-");
          return { empID1, empID2, projectID, daysWorked: totalDays };
        }
        return longestPair;
      },
      { daysWorked: 0 }
    );

    return longestWorkingPair;
  };

  const result = findLongestWorkingPair();

  return (
    <div className='container'>
      <h2>Longest Working Pair</h2>
      {result ? (
        <div className="employees-table-wrap">
          <table className='employees-table'>
            <thead>
              <tr>
                <th>Employee ID #1</th>
                <th>Employee ID #2</th>
                <th>Project ID</th>
                <th>Days Worked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.empID1}</td>
                <td>{result.empID2}</td>
                <td>{result.projectID}</td>
                <td>{result.daysWorked}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default DataProcessor;
