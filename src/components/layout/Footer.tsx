import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const branches = [
    { name: "Perambur Branch", location: "#61/171, Madhavaram High Road, Near Brindha Theatre, Chennai - 600011", phone: "+91 9043811818" },
    { name: "Kolathur Branch", location: "#3, Shiva Parvathi Nagar, Red Hills, Kolathur, Chennai - 600099", phone: "+91 9962466888" },
    { name: "Villivakkam Branch", location: "Villivakkam High Road, Near Bus Terminus, Chennai - 600049", phone: "+91 9043811818" },
];

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t pt-12 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="relative h-12 w-48 mb-6">
                            <Image
                                src="/logo.jpg"
                                alt="Adhithya Electronics"
                                fill
                                className="object-contain object-left"
                                quality={100}
                            />
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-4 sr-only">Adhithya Electronics</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your trusted partner for authentic electronics since 1995. Original Quality Products At Best Price.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Youtube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
                            <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/branches" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Branches</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contact Us</h3>
                        <div className="space-y-4">
                            {branches.map((branch) => (
                                <div key={branch.name} className="flex items-start space-x-3">
                                    <MapPin className="text-primary mt-1" size={16} />
                                    <div>
                                        <h4 className="text-xs font-bold">{branch.name}</h4>
                                        <p className="text-xs text-muted-foreground">{branch.location}</p>
                                        <p className="text-xs text-muted-foreground">{branch.phone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t border-b py-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold mb-1">Stay updated with latest offers</h3>
                            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for exclusive deals.</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white border px-4 py-2 rounded-l-md w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="bg-primary text-white px-6 py-2 rounded-r-md hover:bg-red-700 transition-colors font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>© 2026 Adhithya Electronics. All rights reserved.</p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
                        <span className="text-muted-foreground/60">|</span>
                        <span>Designed by <a href="https://rexonsofttech.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">RST Technologies</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
