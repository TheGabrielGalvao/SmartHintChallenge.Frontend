import { Route, Routes } from "react-router"
import { CustomerList } from "../features/Customer/pages/CustomerList"
import { NotFoundPage } from "../components/templates/NotFoundPage"
import { CustomerForm } from "../features/Customer/pages/CustomerForm"
import { Settings } from "../features/Settings/Settings"

export const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/customer" element={<CustomerList />} />
            <Route path="/customer/new" element={<CustomerForm />} />
            <Route path="/customer/edit/:uuid" element={<CustomerForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}