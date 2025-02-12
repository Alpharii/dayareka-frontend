const CustomerTable = () => {
    return (
      <table className="w-full bg-white shadow-md rounded mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Customer Name</th>
            <th className="p-2">Level</th>
            <th className="p-2">Favorite Menu</th>
            <th className="p-2">Total Transaction</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Odjs Rhinehart</td>
            <td className="p-2 text-orange-500">Warga</td>
            <td className="p-2">Chicken & Ribs Combo</td>
            <td className="p-2">IDR 194,700</td>
            <td className="p-2 text-blue-500 cursor-pointer">Detail</td>
          </tr>
        </tbody>
      </table>
    );
  };
  
  export default CustomerTable;
  