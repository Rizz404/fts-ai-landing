<?php

use App\Http\Controllers\Admin\ConsultantController;
use App\Http\Controllers\Admin\ConsultationController as AdminConsultationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HandoverController;
use App\Http\Controllers\Admin\KnowledgeItemController;
use App\Http\Controllers\Admin\ServiceOfferingController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\SolutionConsultantChatController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'home'])->name('home');
Route::get('consultation', [LandingController::class, 'consultation'])->name('consultation');
Route::get('lp', [LandingController::class, 'lp'])->name('lp');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [LoginController::class, 'create'])->name('login');
        Route::post('login', [LoginController::class, 'store'])->middleware('throttle:5,1')->name('login.store');
    });

    Route::middleware('auth')->group(function () {
        Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('service-offerings', ServiceOfferingController::class)->except('show');
        Route::resource('consultants', ConsultantController::class)->except('show');
        Route::resource('knowledge-items', KnowledgeItemController::class)->except('show');

        Route::get('consultations', [AdminConsultationController::class, 'index'])->name('consultations.index');
        Route::patch('consultations/{consultation}/status', [AdminConsultationController::class, 'updateStatus'])->name('consultations.status');

        Route::get('handovers', [HandoverController::class, 'index'])->name('handovers.index');
        Route::get('handovers/{handover}', [HandoverController::class, 'show'])->name('handovers.show');
        Route::post('handovers/{handover}/reply', [HandoverController::class, 'reply'])->name('handovers.reply');
        Route::post('handovers/{handover}/resolve', [HandoverController::class, 'resolve'])->name('handovers.resolve');
    });
});

// JSON endpoints used by the landing page's chat and booking form.
Route::prefix('{companySlug}')->middleware('company')->group(function () {
    Route::get('consultation/options', [ConsultationController::class, 'options'])->middleware('throttle:60,1')->name('consultation.options');

    Route::prefix('consultation')->name('consultation.')->middleware('throttle:20,1')->group(function () {
        Route::post('quote', [ConsultationController::class, 'quote'])->name('quote');
        Route::post('/', [ConsultationController::class, 'store'])->name('store');
    });

    Route::prefix('solution_consultant')->name('solution_consultant.')->group(function () {
        Route::post('start', [SolutionConsultantChatController::class, 'start'])->middleware('throttle:solution_consultant-start')->name('start');
        Route::post('message', [SolutionConsultantChatController::class, 'message'])->middleware('throttle:solution_consultant-message')->name('message');
        Route::get('history', [SolutionConsultantChatController::class, 'history'])->middleware('throttle:solution_consultant-history')->name('history');
        Route::post('speech', [SolutionConsultantChatController::class, 'speech'])->middleware('throttle:solution_consultant-speech')->name('speech');
    });
});
