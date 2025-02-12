"use client";
import { ChevronRight, Eye, Pencil, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface CustomerData {
  id: number;
  name: string;
  level: string;
  favorite_menu: string | null;
  total_transaction_value: number;
}

const TableComponent = () => {
  const router = useRouter()
  const [data, setData] = useState<CustomerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/customers', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        
        setData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        setError('');
      } catch (err) {
        setError('Gagal memuat data pelanggan');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6">
      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              {['Nama Pelanggan', 'Level', 'Menu Favorit', 'Total Transaksi', 'Aksi'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.level}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.favorite_menu || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.total_transaction_value)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button onClick={() => router.push(`/customer/${item.id}`)}
                    className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-200">
                      <Eye className="w-4 h-4" />
                      <span>Detail</span>
                    </button>
                    <button className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="flex items-center bg-red-100 px-3 py-1 rounded-md text-red-600 hover:bg-red-200">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-700">
          Menampilkan {startItem}-{endItem} dari {totalItems} Pelanggan
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center text-gray-500 hover:text-gray-700 text-sm disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Sebelumnya
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1 rounded-md text-sm ${
                  num === currentPage ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center text-gray-500 hover:text-gray-700 text-sm disabled:opacity-50"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;