import { Table } from "flowbite-react";

export default function UsersSkeletonLoading() {
  return (
    <div className="md:mx-auto md:w-[var(--dashboard-width)]">
      <h2 className="font-semibold text-3xl text-center my-8">Users</h2>
      <div className="w-[98%] mx-auto bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Users</h1>
        </div>
        <div className="overflow-x-scroll rounded-md">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-gray-100 text-center">
                <h3 className="w-20">User Image</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Role</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-24">On Progress Books</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Finished Books
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Total Books
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Created At</h3>
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                <h3 className="w-20">Last Update</h3>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell>
                      <div className="w-11 h-11 mx-auto rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-48 h-3 bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded-sm"></h3>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <h3 className="w-8 h-3 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <h3 className="w-8 h-3 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <h3 className="w-8 h-3 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-24 h-3 bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell>
                      <h3 className="w-24 h-3 bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
