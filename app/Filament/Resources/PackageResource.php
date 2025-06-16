<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Package;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Columns\BooleanColumn;
use App\Filament\Resources\PackageResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\PackageResource\RelationManagers;

class PackageResource extends Resource
{
    protected static ?string $model = Package::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required()->maxLength(100),
            TextInput::make('price')->numeric()->required(),
            TextInput::make('badge')->label('Tech Stack')->nullable(),
            TextInput::make('tagline')->label('Tagline / Short Description')->nullable(),
            Select::make('category')
                ->options([
                    'student' => 'Student',
                    'company' => 'Company',
                ])->required(),
            Repeater::make('features')
                ->schema([
                    TextInput::make('value')->label('Feature'),
                ])
                ->label('Features')
                ->columns(1)
                ->required(),
            TextInput::make('revisions')->numeric()->default(0),
            TextInput::make('support_duration')->label('Support Duration (e.g. 2 Weeks)')->nullable(),
            Toggle::make('is_recommended')->label('Recommended Package'),
            Toggle::make('is_active')->label('Active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('name')->searchable()->sortable(),
            TextColumn::make('category')->badge(),
            TextColumn::make('price')->money('IDR'),
            BooleanColumn::make('is_recommended'),
            BooleanColumn::make('is_active'),
        ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPackages::route('/'),
            'create' => Pages\CreatePackage::route('/create'),
            'edit' => Pages\EditPackage::route('/{record}/edit'),
        ];
    }
}
