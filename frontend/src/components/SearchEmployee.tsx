import { useStore } from "../store/ZustandStore";

export function SearchEmployee() {
    const { setSearchEmployee } = useStore();

    return (
        <form>
            <input
                type="text"
                name="searchEmployee"
                placeholder="Search employee..."
                className="px-4 py-2 border rounded-full shadow-md transition-shadow
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setSearchEmployee(e.target.value)}
            />
        </form>
    )
}
