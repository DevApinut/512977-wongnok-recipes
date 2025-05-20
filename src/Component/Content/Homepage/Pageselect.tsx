import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className='border p-3 rounded-xl'>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} >
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className='font-bold'>
                    Prev
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        style={{
                            fontWeight: currentPage === page ? 'bold' : 'normal',
                            backgroundColor: currentPage === page ? '#ddd' : 'white',
                        }}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='font-bold'
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default Pagination;
