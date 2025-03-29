
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf, Shield, BarChart2, Truck, Users, CircleDollarSign } from "lucide-react";
import farmer from "@/assets/black-women-farmer.jpeg";

export default function Index() {
  const { isAuthenticated } = useAuth();

  function newDate() {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-background sticky top-0 z-30">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            
            <span className="text-xl font-bold">TerraTrust🌱</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link to="#roles" className="text-sm font-medium hover:text-primary">
              Roles
            </Link>
            <Link to="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Agricultural Supply Chain{" "}
                <span className="text-primary">Transparency</span> with Blockchain
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                TerraTrust🌱 leverages blockchain technology to create trust and transparency
                across the agricultural supply chain, connecting farmers, distributors,
                financial institutions, and regulators on a single platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <img src={farmer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge blockchain technology with
              user-friendly interfaces to create transparency and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Immutable Records</h3>
              <p className="text-muted-foreground">
                All transactions are recorded on the blockchain, ensuring data
                integrity and preventing fraud or tampering.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <BarChart2 className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Access detailed analytics and reporting on supply chain
                performance, financial transactions, and compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Truck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Shipment Tracking</h3>
              <p className="text-muted-foreground">
                Track agricultural products from farm to table with complete
                visibility and real-time updates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <CircleDollarSign className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Financial Integration</h3>
              <p className="text-muted-foreground">
                Streamlined loan applications, disbursements, and repayments with
                transparent record-keeping.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Multi-Stakeholder Platform</h3>
              <p className="text-muted-foreground">
                Custom interfaces for farmers, distributors, financial institutions,
                and regulators — all connected to the same blockchain.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <Leaf className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                Promote and verify sustainable agricultural practices through
                transparent supply chain documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section id="roles" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">For All Stakeholders</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              TerraTrust🌱 provides customized experiences for each participant in the
              agricultural supply chain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                <Leaf className="h-6 w-6" /> For Farmers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Track and document produce from planting to sale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Apply for and manage agricultural loans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Record input deliveries and inventory</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Access market information and pricing data</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link to="/register">Register as a Farmer</Link>
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-secondary flex items-center gap-2">
                <Truck className="h-6 w-6" /> For Distributors
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Track shipments and manage logistics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Verify produce origin and quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Manage inventory and orders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <span>Create transparent supply chain records</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link to="/register">Register as a Distributor</Link>
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-amber-500 flex items-center gap-2">
                <CircleDollarSign className="h-6 w-6" /> For Financial Institutions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Process and track agricultural loans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Monitor loan disbursements and repayments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Reduce risk with transparent supply chain data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">✓</span>
                  <span>Generate detailed financial reports</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link to="/register">Register as a Financial Institution</Link>
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                <Shield className="h-6 w-6" /> For Regulators
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Oversee all supply chain activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Monitor compliance with agricultural regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Access comprehensive blockchain data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Generate compliance and audit reports</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline" asChild>
                <Link to="/register">Register as a Regulator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join TerraTrust🌱?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Begin your journey towards a transparent, efficient, and
            blockchain-secured agricultural supply chain today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/register">Create Account</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">TerraTrust🌱</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} TerraTrust🌱. All rights reserved.</p>

          </div>
        </div>
      </footer>
    </div>
  );
}
