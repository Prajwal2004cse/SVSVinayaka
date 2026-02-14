import { useEffect, useState } from "react";
import LeadChart from "./LeadChart";
import AdminLayout from "./AdminLayout";

function Leads() {

  const [leads, setLeads] = useState([]);

  // Load leads
  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/leads`)
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <AdminLayout>

      <h2 className="text-2xl font-bold mb-6">
        Customer Leads
      </h2>

      {/* Chart */}
      <LeadChart data={leads} />

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full border rounded">

          <thead className="bg-gray-100 dark:bg-slate-800">

            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Page</th>
              <th className="border p-3">Date</th>
            </tr>

          </thead>

          <tbody>

            {leads.length === 0 ? (

              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500"
                >
                  No leads yet
                </td>
              </tr>

            ) : (

              leads.map(lead => (

                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">

                  <td className="border p-2 text-center">
                    {lead.id}
                  </td>

                  <td className="border p-2 text-center">
                    {lead.page}
                  </td>

                  <td className="border p-2 text-center">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Leads;
