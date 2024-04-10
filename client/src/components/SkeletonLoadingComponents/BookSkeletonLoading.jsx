import { Table } from "flowbite-react";

export default function BookSkeletonLoading() {
  return (
    <div className="md:mx-auto md:w-[var(--dashboard-width)]">
      <h2 className="font-semibold text-3xl text-center my-8">Books</h2>
      <div className="w-[98%] mx-auto bg-gray-50 dark:bg-gray-800 rounded-md shadow-xl">
        <div className="flex justify-between items-end ml-2 mr-4 mb-2">
          <h1 className="text-2xl font-semibold">Recent Book</h1>
        </div>
        <div className="overflow-x-scroll rounded-md">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Book Cover
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Title</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Author</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Reader</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Page</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Genre</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Author&apos;s nationality
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">language</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                translated to
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                translator
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">state</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">Publisher</Table.HeadCell>
              <Table.HeadCell className="bg-gray-100">
                Published Date
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
                      <h3 className="w-4 h-3 bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-14 w-auto my-auto bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-12 h-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="w-12 h-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2 mr-1 items-center">
                        <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
                        <h3 className="w-36 h-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></h3>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-8 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-8 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="">
                      <div className="w-8 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-16 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-16 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-16 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-16 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-16 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="w-32 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-32 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="w-32 h-2 mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
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
