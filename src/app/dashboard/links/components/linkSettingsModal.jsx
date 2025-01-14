"use client";

import React from "react";
import { FaRegSave } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";


export default function EditLinkModal({
  shortUrl,
  destinationUrl,
  setDestinationUrl,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#0d1117] rounded-lg p-6 w-96 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Edit Link</h2>
        
        {/* Destination URL Input */}
        <div className="mb-4">
          <label htmlFor="destinationUrl" className="block text-sm font-medium text-white mb-2">
            Destination URL
          </label>
          <input
            id="destinationUrl"
            type="text"
            className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-md focus:ring-2 focus:ring-gray-500"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
          />
        </div>

        {/* Short URL Input */}
        <div className="mb-4">
          <label htmlFor="shortUrl" className="block text-sm font-medium text-white mb-2">
            Extension 
          </label>
          <div className="relative">
            <input
              id="shortUrl"
              type="text"
              className="w-full px-4 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-gray-400"
              value={`/${shortUrl}`}
              readOnly
            />
            <button
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              <MdLockOutline />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
            <TiWarningOutline className="text-gray-400" />
            The extension cannot be edited.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500"
            onClick={onSave}
          >
            <FaRegSave />
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
