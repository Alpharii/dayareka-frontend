import { Search, Filter, RefreshCw, Plus, Printer } from "lucide-react";
import Image from "next/image";

export default function HeroCard() {
  return (
    <div className="relative w-full text-white p-6 rounded-lg overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Left Side: Title & Description */}
        <div>
          <h1 className="text-2xl font-bold">Customer</h1>
          <p className="mt-2 text-base">
            On this menu you will be able to create, edit, and also
          </p>
          <p className="text-base mb-3">
            delete the customer. Also, you can manage it easily.
          </p>
        </div>

        {/* Right Side: Buttons & Search */}
        <div className="flex items-center gap-4 p-3 rounded-lg">
          {/* Add Customer Button */}
          <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 text-lg rounded-lg font-medium">
            <Plus size={22} />
            Add New Customer
          </button>

          {/* Search Bar with Button Inside */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Customer"
              className="w-full pl-10 pr-20 py-3 text-lg rounded-lg border border-gray-300 text-gray-800 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            <div className="absolute right-0 top-0 h-full bg-blue-white text-white px-6 rounded-r-lg text-lg font-medium">
                <button className="relative p-2 px-5 mt-1 bg-blue-700 rounded-lg -mr-4 border-blue-700 border">
                    Search
                </button>
            </div>
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 bg-gray-700/60 text-white px-6 py-3 text-lg rounded-lg font-medium shadow">
            <Filter size={22} />
            Filter
          </button>

          {/* Refresh Button */}
          <button className="flex items-center gap-2 bg-gray-700/60 text-white px-6 py-3 text-lg rounded-lg font-medium shadow">
            <RefreshCw size={22} />
            Refresh
          </button>

          {/* Print Button */}
          <button className="bg-gray-700/60 text-white p-3 text-lg rounded-lg shadow">
            <Printer size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
