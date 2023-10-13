

export default function CreateDonor() {
  return (
    <>
      <main className="max-w-md px-2  mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold"> Create a Donor</h1>
        <form>
          {/* Name */}

          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            placeholder="Name"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded
            transition duration-200 ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          />
        </form>
      </main>
    </>
  );
}
