import { ErrorHandler } from "@/lib/errors";
import api from "@/lib/axiosInstance";
import { IContributionList, IContribution, IQueryParams } from "@/common/types/debtor/contribution";

export const ApiGetAllContributions = async (query: IQueryParams): Promise<IContributionList | undefined> => {
    try {
        const response = await api.get("/debtor-contribution", {
            params: query,
        });

        const contributions: IContributionList = response.data;

        return contributions;
    } catch (error) {
        ErrorHandler.handle(error);
    }
}

export const ApiSaveContributions = async (contributionId: string, data: any): Promise<IContribution | undefined> => {
    try {
        const response = await api.patch(`/debtor-contribution/${contributionId}/company-info`, data);
        const contribution: IContribution = response.data;
        
        return contribution;
    } catch (error) {
        ErrorHandler.handle(error);
    }
}