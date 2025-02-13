import React from 'react';

export interface Pig {
  pig_id: number;
  breed: string;
  in_heat: boolean;
  breeding_time: string; // ISO date string
  pregnant_check: boolean;
  farrowing_time: string; // ISO date string
}

interface DataTablesProps {
  pigs: Pig[];
}

const DataTables: React.FC<DataTablesProps> = ({ pigs }) => {
  return (
    <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
      <section className="data-table-common rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* Top Bar: Search & Per Page */}
        <div className="flex justify-between px-7.5 py-4.5">
          <div className="relative z-20 w-full max-w-[414px]">
            <input
              className="w-full rounded-lg border border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
              placeholder="Search here..."
              type="text"
            />
            <button className="absolute right-0 top-0 flex h-11.5 w-11.5 items-center justify-center rounded-r-md bg-primary text-white">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <g clipPath="url(#clip0_1699_11536)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1699_11536">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div className="flex items-center font-medium">
            <p className="pl-2 text-dark dark:text-current">Per Page:</p>
            <select className="bg-transparent pl-2.5">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        {/* Data Table */}
        <table
          role="table"
          className="datatable-table w-full table-auto !border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
        >
          <thead className="border-separate px-4">
            <tr className="border-t border-stroke dark:border-dark-3" role="row">
              <th role="columnheader">Pig ID</th>
              <th role="columnheader">Breed</th>
              <th role="columnheader">In Heat</th>
              <th role="columnheader">Breeding Time</th>
              <th role="columnheader">Pregnant Check</th>
              <th role="columnheader">Farrowing Time</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {pigs.map((pig) => (
              <tr key={pig.pig_id} className="border-t border-stroke dark:border-dark-3" role="row">
                <td role="cell">{pig.pig_id}</td>
                <td role="cell">{pig.breed}</td>
                <td role="cell">{pig.in_heat ? 'Yes' : 'No'}</td>
                <td role="cell">{new Date(pig.breeding_time).toLocaleString()}</td>
                <td role="cell">{pig.pregnant_check ? 'Yes' : 'No'}</td>
                <td role="cell">{new Date(pig.farrowing_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between px-7.5 py-7">
          <div className="flex items-center">
            <button
              className="flex items-center justify-center rounded-[3px] p-[7px] hover:bg-primary hover:text-white disabled:pointer-events-none"
              disabled
            >
              <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
                <path d="M15.8562 2.80185C16.0624 2.80185 16.2343 2.8706 16.4062 3.0081C16.7155 3.31748 16.7155 3.79873 16.4062 4.1081L9.1874 11.4987L16.4062 18.855C16.7155 19.1644 16.7155 19.6456 16.4062 19.955C16.0968 20.2644 15.6155 20.2644 15.3062 19.955L7.5374 12.0487C7.22803 11.7394 7.22803 11.2581 7.5374 10.9487L15.3062 3.04248C15.4437 2.90498 15.6499 2.80185 15.8562 2.80185Z" />
              </svg>
            </button>
            <button className="bg-primary text-white mx-1 flex items-center justify-center rounded-[3px] p-1.5 px-[15px] font-medium hover:bg-primary hover:text-white">
              1
            </button>
            <button className="mx-1 flex items-center justify-center rounded-[3px] p-1.5 px-[15px] font-medium hover:bg-primary hover:text-white">
              2
            </button>
            <button className="mx-1 flex items-center justify-center rounded-[3px] p-1.5 px-[15px] font-medium hover:bg-primary hover:text-white">
              3
            </button>
            <button className="flex items-center justify-center rounded-[3px] p-[7px] hover:bg-primary hover:text-white disabled:pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
                <path d="M8.08721 20.1957C7.88096 20.1957 7.70908 20.127 7.53721 19.9895C7.22783 19.6801 7.22783 19.1988 7.53721 18.8895L14.756 11.4988L7.53721 4.14258C7.22783 3.8332 7.22783 3.35195 7.53721 3.04258C7.84658 2.7332 8.32783 2.7332 8.63721 3.04258L16.406 10.9488C16.7153 11.2582 16.7153 11.7395 16.406 12.0488L8.63721 19.9551C8.49971 20.0926 8.29346 20.1957 8.08721 20.1957Z" />
              </svg>
            </button>
          </div>
          <p className="font-medium">Showing 1 of 3 pages</p>
        </div>
      </section>
    </div>
  );
};

export default DataTables;