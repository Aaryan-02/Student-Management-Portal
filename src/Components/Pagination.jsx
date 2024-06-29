import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex justify-end items-center w-full max-w-4xl ml-12">
            <div className="text-white text-3xl mr-6">{`${(currentPage - 1) * 5 + 1}-${Math.min(currentPage * 5, totalPages * 5)} of ${totalPages * 5}`}</div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    className={`border rounded-full focus:outline-none ${currentPage === 1 ? 'bg-gray-400' : 'bg-white transition duration-300 hover:bg-gray-200'}`}
                    disabled={currentPage === 1}
                >
                    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /> <polyline points="12 8 8 12 12 16" /> <line x1="16" y1="12" x2="8" y2="12" />
                    </svg>
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    className={`border rounded-full focus:outline-none ${currentPage === totalPages ? 'bg-gray-400' : 'bg-white transition duration-300 hover:bg-gray-200'}`}
                    disabled={currentPage === totalPages}
                >
                    <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /> <polyline points="12 16 16 12 12 8" /> <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
