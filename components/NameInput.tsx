"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Load saved name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError("Tên phải có ít nhất 2 ký tự");
      return;
    }
    
    if (trimmedName.length > 30) {
      setError("Tên không được quá 30 ký tự");
      return;
    }
    
    onSubmit(trimmedName);
  };

  const handleChangeName = () => {
    localStorage.removeItem('playerName');
    setName("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            🎭 Trò Chơi Tin Giả
          </h1>
          <p className="text-lg text-muted-foreground">
            Nhập tên của bạn để bắt đầu
          </p>
        </div>

        {/* Name Input Form */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Tên người chơi
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Nhập tên của bạn..."
                className="text-lg"
                maxLength={30}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg py-6"
              disabled={name.trim().length < 2}
            >
              Bắt đầu chơi
            </Button>

            {name && (
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleChangeName}
              >
                Đổi tên khác
              </Button>
            )}
          </form>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Tên của bạn sẽ được hiển thị trên bảng xếp hạng và được lưu tự động
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
