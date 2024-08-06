import { Outlet, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ModeToggle } from "../components/mode-toggle";
import { LangToggle } from "../components/lang-toggle";
import { Toaster } from "../components/ui/toaster";
import { Package2 } from "lucide-react";
import { Button } from "../components/ui/button";

import { CircleUser } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Home,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
const Layout = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen w-full flex-col  ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {state.isAuthenticated && (
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
              <TooltipProvider>
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                  <NavLink
                    to="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </NavLink>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="/home"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="/createuser"
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Create User</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Create User</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="/equbes"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Package className="h-5 w-5" />
                        <span className="sr-only">Equbes</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Equbes</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Users2 className="h-5 w-5" />
                        <span className="sr-only">Customers</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Customers</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <LineChart className="h-5 w-5" />
                        <span className="sr-only">Analytics</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Analytics</TooltipContent>
                  </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink
                        to="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                  </Tooltip>
                </nav>
              </TooltipProvider>
            </aside>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <NavLink
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </NavLink>
                  <NavLink
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </NavLink>
                  <NavLink
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </NavLink>
                  <NavLink
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </NavLink>
                  <NavLink
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </NavLink>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <div className="ml-auto flex-1 sm:flex-initial"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <NavLink to="/signout">
                      <p>logout</p>
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ModeToggle />
              <LangToggle />
            </div>
          </header>
        )}
        <main>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default Layout;
