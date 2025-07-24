"use client";
import RequireAuth from '../../components/RequireAuth';

export default function BudgetPage() {
  return (
    <RequireAuth>
      {console.log("Budget Page")}
      {/* ... existing code ... */}
    </RequireAuth>
  );
}