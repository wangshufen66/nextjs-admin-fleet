import React from 'react';
import { Button } from 'antd';

export default async function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <div className="App">
        <div>
          <Button type="primary">Button</Button>
        </div>
      </div>
    </main>
  );
}
