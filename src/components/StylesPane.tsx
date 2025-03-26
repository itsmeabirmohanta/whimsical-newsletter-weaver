import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

interface StyleProperties {
  backgroundColor?: string;
  color?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
  borderWidth?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  borderColor?: string;
  borderRadius?: string;
  opacity?: string;
  boxShadow?: string;
  transform?: string;
}

interface StylesPaneProps {
  type: string;
  style: StyleProperties;
  onStyleChange: (style: StyleProperties) => void;
}

export const StylesPane: React.FC<StylesPaneProps> = ({ type, style, onStyleChange }) => {
  const updateStyle = (key: keyof StyleProperties, value: string | number) => {
    onStyleChange({ ...style, [key]: value });
  };

  const renderColorPicker = (label: string, key: string, value: string) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => updateStyle(key as keyof StyleProperties, e.target.value)}
          className="w-12 h-8 p-1"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => updateStyle(key as keyof StyleProperties, e.target.value)}
          className="flex-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const renderSpacing = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Margin</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Top"
            value={style.marginTop}
            onChange={(e) => updateStyle('marginTop' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Right"
            value={style.marginRight}
            onChange={(e) => updateStyle('marginRight' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={style.marginBottom}
            onChange={(e) => updateStyle('marginBottom' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Left"
            value={style.marginLeft}
            onChange={(e) => updateStyle('marginLeft' as keyof StyleProperties, e.target.value + 'px')}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Padding</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Top"
            value={style.paddingTop}
            onChange={(e) => updateStyle('paddingTop' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Right"
            value={style.paddingRight}
            onChange={(e) => updateStyle('paddingRight' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Bottom"
            value={style.paddingBottom}
            onChange={(e) => updateStyle('paddingBottom' as keyof StyleProperties, e.target.value + 'px')}
          />
          <Input
            type="number"
            placeholder="Left"
            value={style.paddingLeft}
            onChange={(e) => updateStyle('paddingLeft' as keyof StyleProperties, e.target.value + 'px')}
          />
        </div>
      </div>
    </div>
  );

  const renderTypography = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select value={style.fontFamily} onValueChange={(value) => updateStyle('fontFamily' as keyof StyleProperties, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
            <SelectItem value="system-ui">System UI</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Font Size</Label>
        <div className="flex gap-2">
          <Slider
            value={[parseInt(style.fontSize) || 16]}
            min={8}
            max={72}
            step={1}
            onValueChange={([value]) => updateStyle('fontSize' as keyof StyleProperties, `${value}px`)}
            className="flex-1"
          />
          <Input
            type="number"
            value={parseInt(style.fontSize) || 16}
            onChange={(e) => updateStyle('fontSize' as keyof StyleProperties, `${e.target.value}px`)}
            className="w-20"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Font Weight</Label>
        <Select value={style.fontWeight} onValueChange={(value) => updateStyle('fontWeight' as keyof StyleProperties, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="300">Light</SelectItem>
            <SelectItem value="500">Medium</SelectItem>
            <SelectItem value="600">Semibold</SelectItem>
            <SelectItem value="800">Extra Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <Select value={style.textAlign} onValueChange={(value) => updateStyle('textAlign' as keyof StyleProperties, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Line Height</Label>
        <Slider
          value={[parseFloat(style.lineHeight || '1.5')]}
          min={1}
          max={3}
          step={0.1}
          onValueChange={([value]) => updateStyle('lineHeight', value.toString())}
          className="flex-1"
        />
      </div>
      <div className="space-y-2">
        <Label>Letter Spacing</Label>
        <Slider
          value={[parseFloat(style.letterSpacing) || 0]}
          min={-2}
          max={10}
          step={0.5}
          onValueChange={([value]) => updateStyle('letterSpacing' as keyof StyleProperties, `${value}px`)}
          className="flex-1"
        />
      </div>
    </div>
  );

  const renderBorders = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Border Width</Label>
        <Slider
          value={[parseInt(style.borderWidth) || 0]}
          min={0}
          max={10}
          step={1}
          onValueChange={([value]) => updateStyle('borderWidth' as keyof StyleProperties, `${value}px`)}
          className="flex-1"
        />
      </div>
      <div className="space-y-2">
        <Label>Border Style</Label>
        <Select value={style.borderStyle} onValueChange={(value) => updateStyle('borderStyle' as keyof StyleProperties, value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
            <SelectItem value="dotted">Dotted</SelectItem>
            <SelectItem value="double">Double</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderColorPicker('Border Color', 'borderColor' as keyof StyleProperties, style.borderColor || '#000000')}
      <div className="space-y-2">
        <Label>Border Radius</Label>
        <Slider
          value={[parseInt(style.borderRadius) || 0]}
          min={0}
          max={50}
          step={1}
          onValueChange={([value]) => updateStyle('borderRadius' as keyof StyleProperties, `${value}px`)}
          className="flex-1"
        />
      </div>
    </div>
  );

  const renderEffects = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Opacity</Label>
        <Slider
          value={[parseFloat(style.opacity || '1')]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={([value]) => updateStyle('opacity', value.toString())}
          className="flex-1"
        />
      </div>
      <div className="space-y-2">
        <Label>Box Shadow</Label>
        <Switch
          checked={style.boxShadow !== 'none'}
          onCheckedChange={(checked) =>
            updateStyle('boxShadow' as keyof StyleProperties, checked ? '0 2px 4px rgba(0,0,0,0.1)' : 'none')
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Transform</Label>
        <Select
          value={style.transform || 'none'}
          onValueChange={(value) => updateStyle('transform' as keyof StyleProperties, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select transform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="scale(1.1)">Scale Up</SelectItem>
            <SelectItem value="scale(0.9)">Scale Down</SelectItem>
            <SelectItem value="rotate(5deg)">Rotate Right</SelectItem>
            <SelectItem value="rotate(-5deg)">Rotate Left</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <Tabs defaultValue="colors">
            <TabsList className="w-full">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="borders">Borders</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
            </TabsList>
            <div className="mt-4 space-y-4">
              <TabsContent value="colors" className="space-y-4">
                {renderColorPicker('Background Color', 'backgroundColor' as keyof StyleProperties, style.backgroundColor || '#ffffff')}
                {renderColorPicker('Text Color', 'color' as keyof StyleProperties, style.color || '#000000')}
                {type === 'button' && (
                  <>
                    {renderColorPicker('Button Color', 'buttonColor' as keyof StyleProperties, style.buttonColor || '#007bff')}
                    {renderColorPicker('Button Text Color', 'buttonTextColor' as keyof StyleProperties, style.buttonTextColor || '#ffffff')}
                  </>
                )}
              </TabsContent>
              <TabsContent value="typography">
                {renderTypography()}
              </TabsContent>
              <TabsContent value="spacing">
                {renderSpacing()}
              </TabsContent>
              <TabsContent value="borders">
                {renderBorders()}
              </TabsContent>
              <TabsContent value="effects">
                {renderEffects()}
              </TabsContent>
            </div>
          </Tabs>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}; 