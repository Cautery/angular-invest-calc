import { Injectable, signal } from '@angular/core';

import type { InvestmentInput } from './app/investment-input.model';
import type { InvestmentOutput } from './app/investment-output.model';

// Handles gathering data from user and calculating results
@Injectable({ providedIn: 'root' })
export class InvestmentService {
    resultsData = signal<InvestmentOutput[] | undefined>(undefined);

    calculateInvestmentResults(data: InvestmentInput) {
        const {
            initialInvestment,
            annualInvestment,
            expectedReturn,
            duration,
        } = data;

        const annualData = [];
        let investmentValue = initialInvestment;

        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear =
                investmentValue * (expectedReturn / 100);
            investmentValue += interestEarnedInYear + annualInvestment;
            const totalInterest =
                investmentValue - annualInvestment * year - initialInvestment;
            annualData.push({
                year: year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue,
                annualInvestment: annualInvestment,
                totalInterest: totalInterest,
                totalAmountInvested:
                    initialInvestment + annualInvestment * year,
            });
        }

        this.resultsData.set(annualData);
    }
}
