
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Login successful',
          description: `Welcome, ${data.username}!`,
        });
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
      } else {
        toast({
          title: 'Login failed',
          description: data.message || 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'Server connection issue. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to fetch products',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);
  
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchProducts();
    }
  }, [isLoggedIn, token]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Inventory Management System
        </h1>
        
        {!isLoggedIn ? (
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the inventory system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
              <p>
                Test credentials: admin@example.com / password123
              </p>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>
                  Manage your product inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={fetchProducts}>
                    Refresh Products
                  </Button>
                  {products.length > 0 ? (
                    <div className="space-y-2">
                      {products.map((product) => (
                        <div 
                          key={product._id}
                          className={`p-4 border rounded-md ${
                            product.isLowStock ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between">
                            <strong>{product.name}</strong>
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-500">{product.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span 
                              className={`text-sm ${
                                product.isLowStock ? 'text-red-600 font-bold' : 'text-gray-500'
                              }`}
                            >
                              In stock: {product.quantity}
                              {product.isLowStock && ' (Low Stock)'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No products available</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setToken('');
                  }}
                >
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This is a demo of the Inventory Management System.<br />
            Backend API available at http://localhost:5000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
